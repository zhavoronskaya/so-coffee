import { Coffee } from "@/types";

const java: Coffee = {
  id: "java",
  title: "Colombia Java",
  subtitle: "Luis F. LLoreda",
  description: "javaDescription",
  origin: "El Colegio, Cundinamarca",
  process: "coffeeProcessNatural",
  altitude: "1800 masl",
  src: "https://www.soroasters.com/online-coffee-shop/p/kenya-mukurweini-j2d3d-2cgd3-622le-839jt-hjlxw-tfkdy-pmrep",
};

const rugbano: Coffee = {
  id: "rugbano",
  title: "Burundi",
  subtitle: "Rugabano",
  description: "rugbanoDescription",
  origin: "Rugabano, Ruvubu",
  process: "coffeeProcessWashed",
  altitude: "1550 - 1750 masl",
  src: "https://www.soroasters.com/online-coffee-shop/p/kenya-mukurweini-j2d3d-2cgd3-622le-wjmdz-x2egk",
};

const salvador: Coffee = {
  id: "salvador",
  title: "Finca Majahual",
  subtitle: " El Salvador",
  description: "salvadorDescription",
  origin: "El Salvador",
  process: "coffeeProcessNatural",
  altitude: "1700 masl",
  src: "https://www.soroasters.com/online-coffee-shop/p/kenya-mukurweini-j2d3d-2cgd3-622le-wjmdz-y6n6p-9er6w-jyxzt",
};

export const COFFEE_DATA = {
  java,
  rugbano,
  salvador,
};
