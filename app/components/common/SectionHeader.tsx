"use client"

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => {
  return (
    <>
      <div className="flex items-center mb-2">
        <h1 className="text-black text-2xl font-semibold">
          {title}
        </h1>
      </div>
      
      <h2 className="text-gray-700 text-base mb-6 max-w-full break-words">
        {subtitle}
      </h2>
    </>
  );
};

export default SectionHeader;