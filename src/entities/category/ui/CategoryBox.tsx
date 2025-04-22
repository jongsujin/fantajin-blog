import { ArrowRight } from 'lucide-react'
import { categories } from '../model/category'
import Link from 'next/link'

export default function CategoryBox() {
  return (
    <div className="mt-12">
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={category.href}>
            <div
              className={`bg-cardColor hover:border-hoverColor/30 group flex h-full flex-col rounded-xl bg-gradient-to-br p-5 shadow-lg transition-all duration-300 hover:shadow-xl ${category.color}`}
            >
              <div className="mb-3">{category.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{category.title}</h3>
              <p className="mb-4 text-sm text-gray-400">
                {category.description}
              </p>
              <div className="text-hoverColor mt-auto flex items-center text-sm transition-transform duration-300 group-hover:translate-x-1">
                <span className="mr-1 font-medium">바로가기</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
