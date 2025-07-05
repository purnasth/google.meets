const Gradient = () => {
  return (
    <>
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-20">
          <div className="absolute top-[-8%] left-[-10%] h-[420px] w-[420px] rounded-full bg-yellow-600 opacity-30 mix-blend-multiply blur-[120px]"></div>
          <div className="absolute top-[35%] left-[-12%] h-[320px] w-[320px] rounded-full bg-green-600 opacity-25 mix-blend-multiply blur-[100px]"></div>
          <div className="absolute top-[45%] left-[45%] h-[180px] w-[180px] rounded-full bg-blue-600 opacity-20 mix-blend-multiply blur-[80px]"></div>
          <div className="absolute bottom-[-8%] left-[5%] h-[200px] w-[200px] rounded-full bg-yellow-600 opacity-20 mix-blend-multiply blur-[90px]"></div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50">
        <div className="absolute top-[-10%] left-[10%] -z-10 h-[350px] w-[350px] rounded-full bg-blue-600 opacity-40 mix-blend-multiply blur-3xl"></div>
        <div className="absolute top-[20%] right-[5%] -z-10 h-[300px] w-[300px] rounded-full bg-red-600 opacity-40 mix-blend-multiply blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[20%] -z-10 h-[250px] w-[250px] rounded-full bg-green-600 opacity-40 mix-blend-multiply blur-3xl"></div>
        <div className="absolute right-[15%] bottom-[-5%] -z-10 h-[300px] w-[300px] rounded-full bg-yellow-600 opacity-40 mix-blend-multiply blur-3xl"></div>
      </div>
    </>
  );
};

export default Gradient;
