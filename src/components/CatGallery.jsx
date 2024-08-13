import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const fetchCatImages = async () => {
  const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=6');
  if (!response.ok) {
    throw new Error('Failed to fetch cat images');
  }
  return response.json();
};

const CatGallery = () => {
  const { data: catImages, isLoading, error } = useQuery({
    queryKey: ['catImages'],
    queryFn: fetchCatImages,
  });

  if (error) {
    return <div className="text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-purple-700">Cat Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array(6).fill(0).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-2">
                  <Skeleton className="h-48 w-full" />
                </CardContent>
              </Card>
            ))
          : catImages?.map((image) => (
              <Card key={image.id}>
                <CardContent className="p-2">
                  <img
                    src={image.url}
                    alt="Cat"
                    className="w-full h-48 object-cover rounded-md"
                  />
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default CatGallery;