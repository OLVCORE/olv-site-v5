// Simple placeholder freight cost estimator for light version
// GET params: origin=ISO country, destination=ISO country, weight (kg), volume (m3)
// Returns rough cost estimates for various modes until external API key configured.

import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Input validation schemas
interface FreightRequest {
  origin: string;
  destination: string;
  weight: number;
  volume: number;
  value: number;
  type: 'maritime' | 'air' | 'road';
  service?: string;
}

function validateFreightInput(data: any): { isValid: boolean; errors: string[]; validated?: FreightRequest } {
  const errors: string[] = [];
  
  // Required fields validation
  if (!data.origin || typeof data.origin !== 'string' || data.origin.trim().length < 2) {
    errors.push('Origin is required and must be at least 2 characters');
  }
  
  if (!data.destination || typeof data.destination !== 'string' || data.destination.trim().length < 2) {
    errors.push('Destination is required and must be at least 2 characters');
  }
  
  // Numeric validations
  const weight = parseFloat(data.weight);
  if (isNaN(weight) || weight <= 0 || weight > 50000) {
    errors.push('Weight must be a positive number between 0.01 and 50,000 kg');
  }
  
  const volume = parseFloat(data.volume);
  if (isNaN(volume) || volume <= 0 || volume > 2000) {
    errors.push('Volume must be a positive number between 0.01 and 2,000 m³');
  }
  
  const value = parseFloat(data.value);
  if (isNaN(value) || value <= 0 || value > 10000000) {
    errors.push('Cargo value must be a positive number between 0.01 and 10,000,000 USD');
  }
  
  // Transport type validation
  const validTypes = ['maritime', 'air', 'road'];
  if (!data.type || !validTypes.includes(data.type)) {
    errors.push('Transport type must be one of: maritime, air, road');
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  return {
    isValid: true,
    errors: [],
    validated: {
      origin: data.origin.trim(),
      destination: data.destination.trim(),
      weight,
      volume,
      value,
      type: data.type,
      service: data.service || 'standard'
    }
  };
}

function calculateFreightEstimate(request: FreightRequest) {
  try {
    const { weight, volume, value, type, service } = request;
    
    // Calculate volumetric weight based on transport type
    let volumetricWeight: number;
    let baseRate: number;
    
    switch (type) {
      case 'air':
        volumetricWeight = volume * 167; // 1m³ = 167kg for air freight
        baseRate = 4.5; // USD per kg
        break;
      case 'maritime':
        volumetricWeight = volume * 1000; // 1m³ = 1000kg for sea freight
        baseRate = 0.8; // USD per kg
        break;
      case 'road':
        volumetricWeight = volume * 300; // 1m³ = 300kg for road freight
        baseRate = 1.2; // USD per kg
        break;
      default:
        throw new Error('Invalid transport type');
    }
    
    // Use higher of actual weight or volumetric weight
    const chargeableWeight = Math.max(weight, volumetricWeight);
    
    // Service multipliers
    const serviceMultipliers = {
      express: 1.5,
      standard: 1.0,
      economy: 0.8
    };
    
    const serviceMultiplier = serviceMultipliers[service as keyof typeof serviceMultipliers] || 1.0;
    
    // Calculate base freight
    const baseFrightCost = chargeableWeight * baseRate * serviceMultiplier;
    
    // Additional charges
    const fuelSurcharge = baseFrightCost * 0.12; // 12% fuel surcharge
    const documentation = 50; // USD flat fee
    const handling = Math.max(25, chargeableWeight * 0.05); // Minimum 25 USD
    const insurance = value * 0.003; // 0.3% of cargo value
    
    const totalCost = baseFrightCost + fuelSurcharge + documentation + handling + insurance;
    
    // Estimated transit time (days)
    const transitTimes = {
      air: { express: 2, standard: 3, economy: 5 },
      maritime: { express: 25, standard: 35, economy: 45 },
      road: { express: 5, standard: 10, economy: 15 }
    };
    
    const transitTime = transitTimes[type][service as keyof typeof transitTimes[typeof type]] || 7;
    
    return {
      success: true,
      calculation: {
        weight: {
          actual: weight,
          volumetric: Math.round(volumetricWeight * 100) / 100,
          chargeable: Math.round(chargeableWeight * 100) / 100
        },
        costs: {
          baseFreight: Math.round(baseFrightCost * 100) / 100,
          fuelSurcharge: Math.round(fuelSurcharge * 100) / 100,
          documentation: documentation,
          handling: Math.round(handling * 100) / 100,
          insurance: Math.round(insurance * 100) / 100,
          total: Math.round(totalCost * 100) / 100
        },
        service: {
          type,
          level: service,
          transitDays: transitTime
        },
        route: {
          origin: request.origin,
          destination: request.destination
        },
        timestamp: new Date().toISOString(),
        currency: 'USD',
        disclaimer: 'This is an estimate only. Actual rates may vary based on specific requirements, market conditions, and carrier availability.'
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Calculation error: ' + (error as Error).message
    };
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract and validate parameters
    const requestData = {
      origin: searchParams.get('origin'),
      destination: searchParams.get('destination'),
      weight: searchParams.get('weight'),
      volume: searchParams.get('volume'),
      value: searchParams.get('value'),
      type: searchParams.get('type'),
      service: searchParams.get('service') || 'standard'
    };
    
    const validation = validateFreightInput(requestData);
    
    if (!validation.isValid) {
      return Response.json({
        error: 'Validation failed',
        details: validation.errors,
        code: 'VALIDATION_ERROR'
      }, { status: 400 });
    }
    
    const result = calculateFreightEstimate(validation.validated!);
    
    if (!result.success) {
      return Response.json({
        error: result.error,
        code: 'CALCULATION_ERROR'
      }, { status: 500 });
    }
    
    return Response.json(result.calculation);
    
  } catch (error) {
    console.error('Freight API error:', error);
    return Response.json({
      error: 'Internal server error',
      message: 'Failed to process freight calculation',
      code: 'INTERNAL_ERROR'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validation = validateFreightInput(body);
    
    if (!validation.isValid) {
      return Response.json({
        error: 'Validation failed',
        details: validation.errors,
        code: 'VALIDATION_ERROR'
      }, { status: 400 });
    }
    
    const result = calculateFreightEstimate(validation.validated!);
    
    if (!result.success) {
      return Response.json({
        error: result.error,
        code: 'CALCULATION_ERROR'
      }, { status: 500 });
    }
    
    return Response.json(result.calculation);
    
  } catch (error) {
    console.error('Freight API POST error:', error);
    return Response.json({
      error: 'Invalid request body',
      message: 'Request body must be valid JSON',
      code: 'INVALID_JSON'
    }, { status: 400 });
  }
}

// Handle unsupported methods
export async function PUT() {
  return Response.json({
    error: 'Method not allowed',
    code: 'METHOD_NOT_ALLOWED'
  }, { status: 405 });
}

export async function DELETE() {
  return Response.json({
    error: 'Method not allowed',
    code: 'METHOD_NOT_ALLOWED'
  }, { status: 405 });
} 