import React from "react";

export interface Product {
    id: number;
    collection: string;
    title: string;
    type: string;
    price: number;
    stocks: number;
    sold: number;
    description: string;
    image: string;
    artist: string;
    artistlink: string;
}

export interface BagProps {
    bag: number[];
    addToBag: React.Dispatch<React.SetStateAction<number[]>>;
    productId: number;
  }

export interface Bagtype {
    bag: number[];
  }