interface TagProps {
  tag: string
}

export function Tag({ tag }: TagProps) {
  return (
    <span className="border border-borderColor bg-backgroundColor rounded-full px-3 py-1 text-xs text-white">
      {tag}
    </span>
  )
}
