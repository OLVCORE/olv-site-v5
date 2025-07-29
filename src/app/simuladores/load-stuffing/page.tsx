'use client';
import { useState } from "react";
import VolumesTable from "@/components/simulators/VolumesTable";
import { PackageInput } from "@/lib/binPacking";
import Footer from "@/components/layout/Footer";

export default function LoadStuffingPage() {
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [packages, setPackages] = useState<PackageInput[]>([]);
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVolumesChange = (_totWeight: number, _totVol: number, _rows:any[]) => {
    if (_totWeight && _totVol) {
      setPackages([
        {
          id: "ficticio-1",
          length: 100,
          width: 100,
          height: 100,
          weight: _totWeight,
          quantity: 1,
        },
      ]);
    }
  };

  const generatePlan = async () => {
    if (!packages.length) return;
    setLoading(true);
    try {
      const res = await fetch("/api/load-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packages }),
      });
      const data = await res.json();
      setPlan(data);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar plano de estufagem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="import-sim-container mx-auto max-w-5xl py-6">
        <h1 className="import-sim-heading text-2xl font-bold mb-4 text-white">
          Load & Stuffing Calculation (Beta)
        </h1>
        <div className="border-b mb-4 flex gap-4 text-sm">
          <button
            className={step === 0 ? "border-b-2 border-accent" : "opacity-60"}
            onClick={() => setStep(0)}
          >
            🗂️ Produtos
          </button>
          <button
            className={step === 1 ? "border-b-2 border-accent" : "opacity-60"}
            onClick={() => setStep(1)}
          >
            🚚 Contêineres
          </button>
          <button
            className={step === 2 ? "border-b-2 border-accent" : "opacity-60"}
            onClick={() => plan && setStep(2)}
          >
            📊 Resultado
          </button>
        </div>

        {step === 0 && (
          <div>
            <VolumesTable
              /* @ts-ignore*/
              onChange={handleVolumesChange}
              maxLines={20}
              premium={true}
            />
            <button
              className="btn-primary mt-4"
              disabled={!packages.length}
              onClick={() => setStep(1)}
            >
              Próximo
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <p>
              Seleção automática de contêiner está ativada. Serão considerados: 20′ Dry, 40′ Dry, 40′
              HC e 45′ HC.
            </p>
            <button
              className="btn-primary"
              disabled={loading || !packages.length}
              onClick={generatePlan}
            >
              {loading ? "Gerando..." : "Gerar Plano"}
            </button>
          </div>
        )}

        {step === 2 && plan && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Plano de Estufagem</h2>
            <pre className="bg-gray-800 p-4 rounded overflow-auto">
              {JSON.stringify(plan, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
} 