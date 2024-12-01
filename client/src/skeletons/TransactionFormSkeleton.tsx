const TransactionFormSkeleton = () => {
  return (
    <div className='h-screen max-w-xl mx-auto py-10'>
      {/* Title Skeleton */}
      <h3 className='h-6 bg-gray-200 rounded animate-pulse mb-6'></h3>

      {/* Input Fields Skeletons */}
      <div className='space-y-5'>
        {[...Array(5)].map((_, index) => (
          <div key={index} className='h-12 bg-gray-200 rounded animate-pulse'></div>
        ))}
      </div>

      {/* Button Skeleton */}
      <div className='mt-6 w-full h-12 bg-gradient-to-r from-pink-600 to-indigo-500 rounded-md animate-pulse'></div>
    </div>
  );
};

export default TransactionFormSkeleton;
