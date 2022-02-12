import { Asset } from "../models/Asset";

/**
 * Asset data
 *
 * Each asset has a simple id assigned, so that only the
 * asset id needs to go over wire
 */
export const assets: Asset[] = [
  { id: 1, name: "Foghammer Lead" },
  { id: 2, name: "Secret Glowquake Gold" },
  { id: 3, name: "Shifting Rainshadow Iron" },
  { id: 4, name: "Valkyries' Opal Adamant" },
  { id: 5, name: "Jewelevil Bronze Of Goddesses" },
  { id: 6, name: "Yellow Orichalcum Of Paladins" },
];
