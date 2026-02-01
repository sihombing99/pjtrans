"use client"
import React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function ServiceCard({
  icon,
  title,
  description,
  features,
}: {
  icon: React.ReactElement
  title: string
  description?: string
  features?: string[]
}) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 p-6 min-h-[220px]">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 rounded-full bg-white/60 shadow-sm inline-flex">
          {React.cloneElement(icon as React.ReactElement<any>, { className: "h-16 w-16" })}
        </div>
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-base text-gray-600">{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {(features || []).map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-base text-gray-700">
              <Star className="h-5 w-5 text-yellow-500" />
              {f}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
