import Image from "next/image"

interface ProfileImageProps {
  src: string
  alt: string
  size?: number
  borderColor?: string
}

const ProfileImage = ({ src, alt, size = 56, borderColor = "border-red-500" }: ProfileImageProps) => {
  return (
    <div
      className={`relative rounded-full overflow-hidden border-2 ${borderColor}`}
      style={{ width: size, height: size }}
    >
      <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
    </div>
  )
}

export default ProfileImage

