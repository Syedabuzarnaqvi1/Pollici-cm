interface ConversionData {
  inches: number;
  centimeters: number;
  uniqueFact: string;
  context: string;
  slug: string;
}

export function parseCSV(csvContent: string): ConversionData[] {
  const lines = csvContent.trim().split('\n');
  
  // Filter out empty lines to prevent parsing errors
  const validLines = lines.filter(line => line.trim().length > 0);
  
  if (validLines.length < 2) {
    console.warn('CSV file appears to be empty or malformed');
    return [];
  }
  
  const headers = validLines[0].split(',');
  
  return validLines.slice(1).map(line => {
    // Handle CSV parsing with quoted fields
    const values = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
    const cleanValues = values.map(val => val.replace(/^"|"$/g, ''));
    
    // Skip lines that don't have enough data
    if (cleanValues.length < 4) {
      return null;
    }
    
    const inches = parseFloat(cleanValues[0]);
    const centimeters = parseFloat(cleanValues[1]);
    const uniqueFact = cleanValues[2] || '';
    const context = cleanValues[3] || 'daily life';
    
    // Skip invalid numeric data
    if (isNaN(inches) || isNaN(centimeters) || !isFinite(inches) || !isFinite(centimeters)) {
      return null;
    }
    
    // Generate SEO-friendly slug
    const slug = `${inches.toString().replace('.', '-')}-pollici-in-cm`;
    
    return {
      inches,
      centimeters,
      uniqueFact,
      context,
      slug
    };
  }).filter(Boolean); // Remove null entries
}

export function generateRelatedConversions(currentInches: number, allData: ConversionData[]) {
  const related = [];
  const variations = [-0.2, -0.1, -0.05, 0.05, 0.1, 0.2];
  
  for (const variation of variations) {
    const targetInches = Math.round((currentInches + variation) * 100) / 100;
    if (targetInches > 0) {
      const existing = allData.find(item => Math.abs(item.inches - targetInches) < 0.001);
      if (existing) {
        related.push(existing);
      }
    }
  }
  
  return related;
}

export function generateCategoryLinks(currentInches: number, allData: ConversionData[]) {
  let category: ConversionData[] = [];
  
  if (currentInches < 1) {
    category = allData.filter(item => item.inches < 1);
  } else if (currentInches <= 10) {
    category = allData.filter(item => item.inches >= 1 && item.inches <= 10);
  } else if (currentInches <= 50) {
    category = allData.filter(item => item.inches > 10 && item.inches <= 50);
  } else {
    category = allData.filter(item => item.inches > 50);
  }
  
  // Remove current item and return up to 12 items for better linking
  return category
    .filter(item => item.inches !== currentInches)
    .slice(0, 12);
}

export function generateRandomLinks(allData: ConversionData[], currentSlug: string) {
  const filtered = allData.filter(item => item.slug !== currentSlug);
  
  // Shuffle array and return first 8 items for better connectivity
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 8);
}

export function generatePopularLinks(allData: ConversionData[], currentSlug: string) {
  // Popular inch values that are commonly searched
  const popularInches = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 16, 18, 20, 24, 27, 30, 32, 40, 50, 55, 60, 65, 70, 75];
  
  const popularLinks = [];
  for (const inches of popularInches) {
    const found = allData.find(item => item.inches === inches && item.slug !== currentSlug);
    if (found) {
      popularLinks.push(found);
    }
  }
  
  return popularLinks.slice(0, 10);
}

export function generateSequentialLinks(currentInches: number, allData: ConversionData[]) {
  // Find 5 previous and 5 next sequential pages
  const sortedData = allData.sort((a, b) => a.inches - b.inches);
  const currentIndex = sortedData.findIndex(item => item.inches === currentInches);
  
  const sequential = [];
  
  // Add previous pages
  for (let i = Math.max(0, currentIndex - 5); i < currentIndex; i++) {
    sequential.push(sortedData[i]);
  }
  
  // Add next pages
  for (let i = currentIndex + 1; i <= Math.min(sortedData.length - 1, currentIndex + 5); i++) {
    sequential.push(sortedData[i]);
  }
  
  return sequential;
}