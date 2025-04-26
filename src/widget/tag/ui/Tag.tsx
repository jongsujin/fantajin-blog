interface TagProps {
  tag: string
}

export function Tag({ tag }: TagProps) {
  return (
    <span className="tag-border rounded-lg border px-3 py-1 text-sm">
      {tag}
    </span>
  )
}
