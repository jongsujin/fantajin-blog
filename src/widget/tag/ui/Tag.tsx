interface TagProps {
  tag: string
}

export function Tag({ tag }: TagProps) {
  return (
    <span className="tag-gradient rounded-full border px-2 py-0.5 text-xs">
      {tag}
    </span>
  )
}
