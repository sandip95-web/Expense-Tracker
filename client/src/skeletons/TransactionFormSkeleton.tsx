const TransactionFormSkeleton = () => {
  return (
    <div className="h-screen max-w-xl mx-auto py-10">
      {/* Title Skeleton */}
      <div className="h-6 w-1/3 bg-gray-200 rounded animate-pulse mb-8"></div>

      {/* Form Field Skeletons */}
      <div className="space-y-6">
        {[...Array(5)].map((_, index) => (
          <div key={index}>
            {/* Label Skeleton */}
            <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse mb-2"></div>
            {/* Input Skeleton */}
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Button Skeleton */}
      <div className="mt-8">
        <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default TransactionFormSkeleton;
