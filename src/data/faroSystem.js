import { offices } from "../mock/offices";

import { calculateISP } from "../utils/ispCalculator";

import { getRiskLevel } from "../utils/riskEngine";

export const processedOffices = offices.map((office) => {

  const isp = calculateISP(office);

  const risk = getRiskLevel(isp);

  return {

    ...office,
    isp,
    risk,

  };

});

export const criticalOffices = processedOffices.filter(
  office => office.risk === "red"
).length;

export const highRiskOffices = processedOffices.filter(
  office =>
    office.risk === "red" ||
    office.risk === "orange"
).length;

export const avgSaturation = Math.round(

  processedOffices.reduce(
    (acc, office) => acc + office.saturation,
    0
  ) / processedOffices.length

);

export const avgWaitTime = Math.round(

  processedOffices.reduce(
    (acc, office) => acc + office.waitTime,
    0
  ) / processedOffices.length

);

export const globalRisk =

  criticalOffices > 0
    ? "CRÍTICO"
    : avgSaturation > 70
    ? "ALTO"
    : "ESTABLE";

export const faroSystem = {

  processedOffices,

  metrics: {

    criticalOffices,
    highRiskOffices,
    avgSaturation,
    avgWaitTime,
    globalRisk,

  },

};