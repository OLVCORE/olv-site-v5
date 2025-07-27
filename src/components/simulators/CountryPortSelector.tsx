"use client";

import React from 'react';
import { Country, portosBrasileiros, paisesImportacao } from '@/lib/countryPortData';
import InfoTooltip from '../ui/InfoTooltip';

interface CountryPortSelectorProps {
  direction: 'importacao' | 'exportacao';
  origin: string;
  destination: string;
  onOriginChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
}

export default function CountryPortSelector({
  direction,
  origin,
  destination,
  onOriginChange,
  onDestinationChange
}: CountryPortSelectorProps) {
  
  // Função para renderizar opções de países agrupados por continente
  const renderCountryOptions = (countries: Country[]) => {
    const groupedByContinent = countries.reduce((acc, country) => {
      if (!acc[country.continente]) {
        acc[country.continente] = [];
      }
      acc[country.continente].push(country);
      return acc;
    }, {} as Record<string, Country[]>);

    return Object.entries(groupedByContinent).map(([continent, countries]) => (
      <optgroup key={continent} label={continent}>
        {countries.map(country => (
          <option key={country.codigo} value={country.codigo}>
            {country.codigo} - {country.nome}
          </option>
        ))}
      </optgroup>
    ));
  };

  // Função para renderizar opções de portos brasileiros
  const renderBrazilianPorts = () => {
    return portosBrasileiros.map(port => (
      <option key={port.codigo} value={port.codigo}>
        {port.nome} - {port.cidade}
      </option>
    ));
  };

  return (
    <div className="space-y-4">
      {/* Seletor de Origem */}
      <div>
        <label className="block text-sm font-medium text-gray-200 dark:text-accent-light mb-1">
          <span className="inline-flex items-center gap-1">
            {direction === 'importacao' ? 'País de Origem' : 'Origem no Brasil'}
            <InfoTooltip content={
              direction === 'importacao' 
                ? "Selecione o país de origem da mercadoria" 
                : "Selecione o porto brasileiro de origem"
            } />
          </span>
        </label>
        <select
          value={origin}
          onChange={(e) => onOriginChange(e.target.value)}
          className="w-full rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 text-sm text-gray-900 dark:text-white"
        >
          {direction === 'importacao' ? (
            // Para importação: todos os países exceto Brasil
            renderCountryOptions(paisesImportacao)
          ) : (
            // Para exportação: apenas portos brasileiros
            renderBrazilianPorts()
          )}
        </select>
      </div>

      {/* Seta de direção */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <span className="text-lg">→</span>
          <span className="text-sm font-medium">
            {direction === 'importacao' ? 'Para Brasil' : 'Para o Mundo'}
          </span>
          <span className="text-lg">→</span>
        </div>
      </div>

      {/* Seletor de Destino */}
      <div>
        <label className="block text-sm font-medium text-gray-200 dark:text-accent-light mb-1">
          <span className="inline-flex items-center gap-1">
            {direction === 'importacao' ? 'Destino no Brasil' : 'País de Destino'}
            <InfoTooltip content={
              direction === 'importacao' 
                ? "Selecione o porto brasileiro de destino" 
                : "Selecione o país de destino da mercadoria"
            } />
          </span>
        </label>
        <select
          value={destination}
          onChange={(e) => onDestinationChange(e.target.value)}
          className="w-full rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 text-sm text-gray-900 dark:text-white"
        >
          {direction === 'importacao' ? (
            // Para importação: apenas portos brasileiros
            renderBrazilianPorts()
          ) : (
            // Para exportação: todos os países exceto Brasil
            renderCountryOptions(paisesImportacao)
          )}
        </select>
      </div>
    </div>
  );
} 