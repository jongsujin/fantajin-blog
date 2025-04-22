interface TagProps {
  tag: string
}

export function Tag({ tag }: TagProps) {
  return (
    <span className="postcard-border rounded-full border px-2 py-1 text-xs">
      {tag}
    </span>
  )
}
