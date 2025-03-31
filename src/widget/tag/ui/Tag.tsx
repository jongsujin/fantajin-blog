interface TagProps {
  tag: string
}

export function Tag({ tag }: TagProps) {
  return (
    <span className="tag-gradient rounded-full border px-3 py-1 text-xs">
      {tag}
    </span>
  )
}
