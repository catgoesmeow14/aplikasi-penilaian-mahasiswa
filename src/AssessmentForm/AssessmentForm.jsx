import React, { useState } from 'react';

export const aspekPenilaianArray = [1, 2, 3, 4];
export const mahasiswaArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const scoreArray = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const pastelBlueColor = '#AECBF5';

const AssessmentForm = () => {
  const [assessmentData, setAssessmentData] = useState(() => {
    const initialData = {};

    for (let i = 1; i <= aspekPenilaianArray.length; i++) {
      const aspekPenilaian = `aspek_penilaian_${i}`;
      initialData[aspekPenilaian] = {};

      for (let j = 1; j <= mahasiswaArray.length; j++) {
        const mahasiswa = `mahasiswa_${j}`;
        initialData[aspekPenilaian][mahasiswa] = 0;
      }
    }

    return initialData;
  });

  const handleSelectChange = (e, aspekPenilaian, mahasiswa) => {
    const { value } = e.target;
    const intValue = Number(value);

    setAssessmentData((prevData) => ({
      ...prevData,
      [aspekPenilaian]: {
        ...prevData[aspekPenilaian],
        [mahasiswa]: intValue,
      },
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(assessmentData);
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-2xl font-bold text-center mt-8 mb-8">
        Aplikasi Penilaian Mahasiswa
      </h1>
      <form onSubmit={handleFormSubmit} className="w-4/5 mx-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-8 py-2"></th>
              {aspekPenilaianArray.map((num) => {
                const aspekPenilaian = `aspek_penilaian_${num}`;
                const headerLabel = `Aspek Penilaian ${num}`;
                return (
                  <th
                    key={aspekPenilaian}
                    className="px-8 py-2 whitespace-nowrap"
                  >
                    {headerLabel}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {mahasiswaArray.map((i) => {
              const mahasiswa = `mahasiswa_${i}`;

              return (
                <tr
                  key={mahasiswa}
                  className="bg-white rounded-lg shadow-md mb-4"
                  style={{ borderBottom: '1px solid #ddd' }}
                >
                  <td className="px-8 py-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"
                        />
                      </svg>
                    </div>
                    <span className="ml-2">{mahasiswa}</span>
                  </td>
                  {aspekPenilaianArray.map((num) => {
                    const aspekPenilaian = `aspek_penilaian_${num}`;
                    const content =
                      assessmentData[aspekPenilaian][mahasiswa] || '';

                    return (
                      <td
                        key={`aspek_penilaian_${num}`}
                        className="px-8 py-2 whitespace-nowrap"
                      >
                        <div className="relative">
                          <select
                            value={content}
                            onChange={(e) =>
                              handleSelectChange(e, aspekPenilaian, mahasiswa)
                            }
                            className="border border-gray-300 rounded-md px-2 py-2 outline-none appearance-none"
                            style={{
                              backgroundColor: pastelBlueColor,
                              width: '100%',
                              marginRight: '2rem',
                            }}
                          >
                            <option value="" disabled hidden>
                              -Select Score-
                            </option>
                            {scoreArray.map((score) => (
                              <option key={score} value={score}>
                                {score}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 w-5 pointer-events-none">
                            <svg
                              className="w-4 h-4 fill-current text-gray-700"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path fillRule="evenodd" d="M10 12l6-6H4l6 6z" />
                            </svg>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssessmentForm;
