interface MemoryMeasurement {
  bytes: number;
  breakdown: MemoryBreakdownEntry[];
}

interface MemoryBreakdownEntry {
  bytes: number,
  attribution: string[],
  userAgentSpecificTypes: string[],
}

interface Performance {
  measureMemory? (): Promise<MemoryMeasurement>;
}
