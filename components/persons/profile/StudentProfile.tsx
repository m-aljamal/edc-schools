import Image from "next/image";
import TextWithLogo from "./TextWithLogo";
import ShowDate from "../../shared/ShowDate";
export default function StudentProfile({ data }) {
  const textStyle = "text-gray-700 font-bold text-base py-2";
  return (
    <div>
      <div className="bg-blue-400 flex p-2 items-center ">
        {data.image.url ? (
          <Image
            src={data.image.url}
            width={220}
            height={220}
            objectFit="cover"
            className=" rounded-full"
          />
        ) : (
          <div className="w-40 h-40 bg-gray-200 rounded-full"></div>
        )}
        <div className=" mr-8">
          <h2 className="text-2xl text-white font-bold">{data?.name}</h2>
          <h2 className="text-lg text-white font-bold mt-1">
            الصف {data?.classNumber}
          </h2>
          <h2 className="text-lg text-white font-bold mt-1">
            الشعبة {data?.division}
          </h2>
        </div>
      </div>
      <div className="p-3 flex justify-evenly">
        <div>
          <p className={textStyle}>اسم الأب: {data?.fatherName}</p>
          <p className={textStyle}>اسم الام: {data?.motherName}</p>
          <p className={textStyle}>الحالة الصحية: {data?.healthSituation}</p>
          <p className={textStyle}>الوضع الإجتماعي: {data?.familySituation}</p>
          <TextWithLogo
            text={`${data?.city} - ${data?.region} - ${data?.address}`}
            logo="fas fa-map-marker-alt "
          />
        </div>
        <div>
          <p className={textStyle}>الجنس: {data?.sex}</p>
          <p className={textStyle}>عدد الإخوة: {data?.numberOfBrother}</p>
          <div className="flex  gap-1 items-center">
            <p className={textStyle}> تاريخ الولادة: </p>
            <ShowDate date={data?.dateOfBirth} />
          </div>
          <div className="flex gap-1 items-center">
            <p className={textStyle}> تاريخ الانضمام: </p>
            <ShowDate date={data?.dateOfStart} />
          </div>
          <TextWithLogo text={data?.phone} logo="fas fa-phone " />
        </div>
      </div>
    </div>
  );
}
