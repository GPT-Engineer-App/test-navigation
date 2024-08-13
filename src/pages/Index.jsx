import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CatFactSection from '../components/CatFactSection';
import CatGallery from '../components/CatGallery';

const fetchCatBreeds = async () => {
  const response = await fetch('https://api.thecatapi.com/v1/breeds?limit=10');
  if (!response.ok) {
    throw new Error('Failed to fetch cat breeds');
  }
  return response.json();
};

const Index = () => {
  const { data: catBreeds, isLoading, error } = useQuery({
    queryKey: ['catBreeds'],
    queryFn: fetchCatBreeds,
  });

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-800">Fascinating World of Cats</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>About Cats</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Cats are fascinating creatures that have been domesticated for thousands of years. 
              Known for their independence, agility, and affectionate nature, cats make wonderful 
              companions for millions of people around the world.
            </p>
          </CardContent>
        </Card>
        
        <CatFactSection />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-purple-700">Popular Cat Breeds</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {isLoading
          ? Array(6).fill(0).map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <Skeleton className="h-4 w-[250px]" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-[200px] mb-2" />
                  <Skeleton className="h-4 w-[150px]" />
                </CardContent>
              </Card>
            ))
          : catBreeds?.map((breed) => (
              <Card key={breed.id}>
                <CardHeader>
                  <CardTitle>{breed.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{breed.temperament}</p>
                  <p className="text-sm mt-2">Origin: {breed.origin}</p>
                </CardContent>
              </Card>
            ))}
      </div>

      <CatGallery />
    </div>
  );
};

export default Index;