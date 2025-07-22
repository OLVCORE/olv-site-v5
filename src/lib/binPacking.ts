// Basic greedy bin-packing placeholder. To be upgraded to 3-D packing using a dedicated lib like `javascript-3d-bin-packing`.

export type PackageInput = {
  id: string;
  length: number; // cm
  width: number;  // cm
  height: number; // cm
  weight: number; // kg
  quantity: number;
};

export type ContainerType = {
  code: string;          // e.g. "20DRY"
  internalVolume: number; // m³
  payloadKg: number;
};

export type PackedContainer = {
  container: ContainerType;
  packages: { id: string; qty: number }[];
  usedVolume: number; // m³
  usedWeight: number; // kg
};

// Margin safety factor (e.g. 0.9 means we fill 90 % of payload/volume)
const SAFETY = 0.9;

export function greedyPack(
  packages: PackageInput[],
  containerOrder: ContainerType[]
): PackedContainer[] {
  const packList: PackedContainer[] = [];

  // Flatten packages by quantity
  const items: PackageInput[] = packages.flatMap((p) =>
    Array.from({ length: p.quantity }, (_, i) => ({ ...p, quantity: 1, id: `${p.id}-${i}` }))
  );

  for (const item of items) {
    const vol = (item.length / 100) * (item.width / 100) * (item.height / 100); // m³

    let placed = false;
    // Try to place in existing containers
    for (const cont of packList) {
      if (
        cont.usedWeight + item.weight <= cont.container.payloadKg * SAFETY &&
        cont.usedVolume + vol <= cont.container.internalVolume * SAFETY
      ) {
        cont.packages.push({ id: item.id, qty: 1 });
        cont.usedWeight += item.weight;
        cont.usedVolume += vol;
        placed = true;
        break;
      }
    }
    if (placed) continue;

    // Need a new container
    const chosen = containerOrder.find(
      (c) => item.weight <= c.payloadKg * SAFETY && vol <= c.internalVolume * SAFETY
    );
    if (!chosen) {
      throw new Error(`Pacote ${item.id} excede a capacidade de todos os contêineres padrão.`);
    }
    packList.push({
      container: chosen,
      packages: [{ id: item.id, qty: 1 }],
      usedWeight: item.weight,
      usedVolume: vol,
    });
  }

  return packList;
} 