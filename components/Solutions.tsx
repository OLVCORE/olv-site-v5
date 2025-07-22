import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Solutions = () => {
  const solutions = [
    {
      title: 'Exportação',
      icon: '/icons/export.svg',
      description: 'Soluções completas para exportação de seus produtos'
    },
    {
      title: 'Importação',
      icon: '/icons/import.svg',
      description: 'Assessoria especializada em importação'
    },
    {
      title: 'Logística',
      icon: '/icons/logistics.svg',
      description: 'Gerenciamento logístico integrado'
    },
    {
      title: 'Armazenagem',
      icon: '/icons/warehouse.svg',
      description: 'Soluções de armazenagem e distribuição'
    }
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent to-bg-secondary">
      <div className="container mx-auto">
        <h2 className="solutions-title">
          Nossas Soluções
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              className="solution-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={solution.icon}
                alt={solution.title}
                width={64}
                height={64}
                className="solution-icon"
              />
              <h3>{solution.title}</h3>
              <p className="text-center text-txt-secondary">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solutions 