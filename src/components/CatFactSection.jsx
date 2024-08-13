import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const fetchCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch cat fact');
  }
  return response.json();
};

const CatFactSection = () => {
  const [factKey, setFactKey] = useState(0);
  const { data: catFact, isLoading, error, refetch } = useQuery({
    queryKey: ['catFact', factKey],
    queryFn: fetchCatFact,
  });

  const handleNewFact = () => {
    setFactKey(prev => prev + 1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cat Fact of the Day</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-4 w-[300px] mb-4" />
        ) : error ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : (
          <p className="text-gray-700 mb-4">{catFact?.fact}</p>
        )}
        <Button onClick={handleNewFact}>Get New Fact</Button>
      </CardContent>
    </Card>
  );
};

export default CatFactSection;