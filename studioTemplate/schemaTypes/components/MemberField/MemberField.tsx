import * as React from 'react'
import { FieldMember, MemberField as SanityMemberField, ObjectInputProps } from 'sanity'

interface MemberFieldProps extends ObjectInputProps<unknown> {
  name: string
}

function MemberField(props: MemberFieldProps) {
  const { name, members, ...other } = props

  const member = members?.find((m): m is FieldMember => m.kind === 'field' && m.name === name)

  if (!member) {
    return null
  }

  return <SanityMemberField member={member} {...other} />
}

export default MemberField
