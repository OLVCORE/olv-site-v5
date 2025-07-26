"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ValidationTooltip } from '../shared/TooltipSystem';

interface ValidationRule {
  test: (value: string) => boolean;
  message: string;
  severity: 'error' | 'warning' | 'success';
}

interface ValidationFeedbackProps {
  value: string;
  rules: ValidationRule[];
  onValidationChange?: (isValid: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const ValidationFeedback: React.FC<ValidationFeedbackProps> = ({
  value,
  rules,
  onValidationChange,
  children,
  className = ''
}) => {
  const [validationResults, setValidationResults] = useState<{
    isValid: boolean;
    message: string;
    severity: 'error' | 'warning' | 'success';
  }>({ isValid: true, message: '', severity: 'success' });

  useEffect(() => {
    if (!value) {
      setValidationResults({ isValid: true, message: '', severity: 'success' });
      onValidationChange?.(true);
      return;
    }

    // Executar todas as regras
    for (const rule of rules) {
      if (!rule.test(value)) {
        setValidationResults({
          isValid: false,
          message: rule.message,
          severity: rule.severity
        });
        onValidationChange?.(false);
        return;
      }
    }

    // Se passou por todas as regras
    setValidationResults({
      isValid: true,
      message: 'Valor válido',
      severity: 'success'
    });
    onValidationChange?.(true);
  }, [value, rules, onValidationChange]);

  const getBorderColor = () => {
    switch (validationResults.severity) {
      case 'error':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'warning':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'success':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default:
        return 'border-gray-300 dark:border-gray-600';
    }
  };

  const getIcon = () => {
    switch (validationResults.severity) {
      case 'error':
        return '✗';
      case 'warning':
        return '⚠';
      case 'success':
        return '✓';
      default:
        return '';
    }
  };

  const getIconColor = () => {
    switch (validationResults.severity) {
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'success':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <ValidationTooltip
        isValid={validationResults.isValid}
        message={validationResults.message}
      >
        <div className={`relative ${value ? 'has-validation' : ''}`}>
          {children}
          
          {/* Ícone de validação */}
          <AnimatePresence>
            {value && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full ${getIconColor()} ${
                  validationResults.severity === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                  validationResults.severity === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                  'bg-red-100 dark:bg-red-900/30'
                }`}
              >
                <span className="text-xs font-bold">{getIcon()}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ValidationTooltip>
    </div>
  );
};

// Regras de validação específicas para simuladores
export const SimulatorValidationRules = {
  // Validação para valores monetários
  currency: (minValue: number = 0): ValidationRule => ({
    test: (value: string) => {
      const numValue = parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'));
      return !isNaN(numValue) && numValue >= minValue;
    },
    message: `Valor deve ser maior ou igual a ${minValue}`,
    severity: 'error'
  }),

  // Validação para porcentagens
  percentage: (minValue: number = 0, maxValue: number = 100): ValidationRule => ({
    test: (value: string) => {
      const numValue = parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'));
      return !isNaN(numValue) && numValue >= minValue && numValue <= maxValue;
    },
    message: `Percentual deve estar entre ${minValue}% e ${maxValue}%`,
    severity: 'error'
  }),

  // Validação para NCM
  ncm: (): ValidationRule => ({
    test: (value: string) => {
      const ncmPattern = /^\d{2,10}$/;
      return ncmPattern.test(value.replace(/\D/g, ''));
    },
    message: 'NCM deve ter entre 2 e 10 dígitos numéricos',
    severity: 'error'
  }),

  // Validação para telefone
  phone: (): ValidationRule => ({
    test: (value: string) => {
      const phonePattern = /^[\d\s\-\(\)\+]{8,15}$/;
      return phonePattern.test(value);
    },
    message: 'Telefone deve ter entre 8 e 15 dígitos',
    severity: 'error'
  }),

  // Validação para email
  email: (): ValidationRule => ({
    test: (value: string) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(value);
    },
    message: 'Email deve ter formato válido',
    severity: 'error'
  }),

  // Validação para CNPJ
  cnpj: (): ValidationRule => ({
    test: (value: string) => {
      const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
      return cnpjPattern.test(value);
    },
    message: 'CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX',
    severity: 'error'
  }),

  // Validação para valores positivos
  positive: (): ValidationRule => ({
    test: (value: string) => {
      const numValue = parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'));
      return !isNaN(numValue) && numValue > 0;
    },
    message: 'Valor deve ser maior que zero',
    severity: 'error'
  }),

  // Validação para valores não negativos
  nonNegative: (): ValidationRule => ({
    test: (value: string) => {
      const numValue = parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.'));
      return !isNaN(numValue) && numValue >= 0;
    },
    message: 'Valor deve ser maior ou igual a zero',
    severity: 'error'
  }),

  // Validação para campos obrigatórios
  required: (): ValidationRule => ({
    test: (value: string) => value.trim().length > 0,
    message: 'Campo obrigatório',
    severity: 'error'
  }),

  // Validação para comprimento mínimo
  minLength: (min: number): ValidationRule => ({
    test: (value: string) => value.trim().length >= min,
    message: `Mínimo de ${min} caracteres`,
    severity: 'error'
  }),

  // Validação para comprimento máximo
  maxLength: (max: number): ValidationRule => ({
    test: (value: string) => value.trim().length <= max,
    message: `Máximo de ${max} caracteres`,
    severity: 'warning'
  })
};

// Componente de campo com validação integrada
export const ValidatedInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  rules: ValidationRule[];
  placeholder?: string;
  label?: string;
  type?: string;
  className?: string;
  onValidationChange?: (isValid: boolean) => void;
}> = ({
  value,
  onChange,
  rules,
  placeholder,
  label,
  type = 'text',
  className = '',
  onValidationChange
}) => {
  return (
    <ValidationFeedback
      value={value}
      rules={rules}
      onValidationChange={onValidationChange}
      className={className}
    >
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-200 dark:text-accent-light">
            {label}
          </label>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-accent focus:border-accent p-2 pr-12 text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white transition-colors"
        />
      </div>
    </ValidationFeedback>
  );
};

// Hook para validação de formulário
export const useFormValidation = (initialValues: Record<string, string>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (name: string, value: string, rules: ValidationRule[]) => {
    for (const rule of rules) {
      if (!rule.test(value)) {
        return rule.message;
      }
    }
    return '';
  };

  const setValue = (name: string, value: string, rules: ValidationRule[] = []) => {
    const newValues = { ...values, [name]: value };
    const newErrors = { ...errors };
    
    if (rules.length > 0) {
      const error = validateField(name, value, rules);
      if (error) {
        newErrors[name] = error;
      } else {
        delete newErrors[name];
      }
    }

    setValues(newValues);
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const validateForm = (fieldRules: Record<string, ValidationRule[]>) => {
    const newErrors: Record<string, string> = {};
    
    Object.keys(fieldRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName] || '', fieldRules[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    isValid,
    setValue,
    validateForm
  };
}; 