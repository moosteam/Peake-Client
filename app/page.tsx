'use client'
import Sidebar from './sidebar/sidebar';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [searchTime, setSearchTime] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.altKey && event.key === 'k') {
      event.preventDefault();
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <Sidebar />
      <div className="flex-1 flex items-start justify-center pl-[250px] pt-8">
        <div className="bg-white rounded-lg w-[95%] max-w-[1200px] 2xl:max-w-[1600px] min-h-[94vh] mx-auto">
          <div className="p-6 mt-2">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg flex justify-between">
              <div className="w-[50%]">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white font-bold text-sm">i</span>
                  </div>
                  <span className="text-blue-900 font-bold text-lg mt-2">구매하실 유튜버 채널명을 입력하세요.</span>
                </div>
                <p className="text-sm text-blue-700 ml-8 mt-[-8px]">
                  구독자 150만 이상 한국인 유튜버만 시장에 존재합니다. 
                </p>
                <div className="mt-4 flex items-center">
                  <div className="relative w-full">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="18" 
                        height="18" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-gray-500"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                    
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
                      <span className="text-gray-400 text-xs px-1.5 py-0.5 rounded border border-gray-300 bg-gray-50">Ctrl+Alt+K</span>
                    </div>
                    
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchTime}
                      onChange={(e) => setSearchTime(e.target.value)}
                      placeholder="채널명을 검색해주세요."
                      className="border border-blue-200 bg-white rounded-lg p-3 pl-10 pr-24 w-full text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-200 placeholder:text-[#9CA0A9]"
                    />
                  </div>
                </div>
              </div>
              
              <div className="w-[45%] flex items-center justify-end">
                <div className="bg-white border border-blue-200 rounded-lg p-7 w-[380px]">
                  <div className="space-y-5">
                    <div>
                      <p className="text-gray-700 font-medium">남은 모의투자금</p>
                      <div className="flex justify-between items-center">
                        <p className="text-[28px] font-bold text-gray-800 flex items-center gap-3">
                          <svg 
                            width="32" 
                            height="32" 
                            viewBox="0 0 1080 1080" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-8"
                          >
                            <rect width="1080" height="1080" rx="540" fill="#2B7FFF"/>
                            <path d="M760.893 258.596C786.836 258.596 801.603 253.807 809.585 263.785C817.568 273.763 810.517 313.808 809.585 326.446" stroke="black" strokeWidth="6" strokeLinejoin="round"/>
                            <path d="M491.488 680.065L483.506 671.284C504.576 660.577 555.264 645.72 622 599.842C662.419 572.056 714.171 523.698 746.126 476.116L746.314 475.835C768.841 442.291 793.777 405.16 803.998 359.573C813.124 315.327 816.34 315.075 817.169 307.33V288.131C817.433 298.992 817.536 303.897 817.169 307.33V365.56L787.634 447.379L746.126 512.835L664.306 599.842L610.825 632.171L491.488 680.065Z" fill="black" stroke="black" strokeWidth="12"/>
                            <path d="M632.48 358.264C668.085 333.89 692.348 348.108 703.819 358.264C713.761 370.728 735.259 403.134 711.399 433.048C687.54 462.961 653.132 449 636.767 438.998C621.932 421.764 596.874 382.638 632.48 358.264Z" stroke="black" strokeWidth="30"/>
                            <path d="M615.215 404.674C618.807 421.437 637.066 440.186 655.127 439.796C667.197 439.535 689.516 439.334 699.429 427.822C710.479 414.99 717.347 393.647 713.797 381.126C709.949 367.556 699.828 353.587 687.455 347.6" stroke="black" strokeWidth="16"/>
                            <path d="M397.728 584.17C394.583 581.067 389.518 581.1 386.414 584.245C383.311 587.39 383.344 592.455 386.489 595.558L397.728 584.17ZM453.173 650.131L459.394 645.101L459.112 644.752L458.793 644.437L453.173 650.131ZM484.858 687.139L487.676 694.626L484.858 687.139ZM482.598 686.525L476.377 691.555L482.598 686.525ZM487.676 694.626L520.25 682.364L514.612 667.39L482.039 679.652L487.676 694.626ZM386.489 595.558L447.554 655.825L458.793 644.437L397.728 584.17L386.489 595.558ZM446.952 655.161L476.377 691.555L488.819 681.495L459.394 645.101L446.952 655.161ZM482.039 679.652C484.46 678.741 487.193 679.484 488.819 681.495L476.377 691.555C479.087 694.907 483.642 696.145 487.676 694.626L482.039 679.652Z" fill="black"/>
                            <path d="M414.06 534.786C408.287 550.718 397.958 572.897 394.503 585.523C394.084 587.053 393.875 587.818 394.13 588.65C394.385 589.482 395.038 590.042 396.344 591.161L445.59 633.368L487.341 679.099C488.584 680.46 489.205 681.141 490.051 681.369C490.896 681.596 491.765 681.323 493.504 680.775C501.412 678.285 512.468 674.574 523.019 670.952C533.488 667.357 543.46 663.849 549.361 661.706M414.06 534.786L379.268 540.678C378.312 540.84 377.835 540.921 377.363 540.851C376.892 540.782 376.459 540.566 375.591 540.133L303.333 504.146C298.396 501.687 295.928 500.458 295.969 498.555C296.011 496.652 298.531 495.532 303.571 493.292L402.673 449.247C402.978 449.111 403.13 449.044 403.289 448.993C403.448 448.943 403.611 448.91 403.938 448.845L462.235 437.234M414.06 534.786C418.834 521.608 421.407 513.741 428.827 498.466C438.773 477.991 446.985 459.291 462.235 437.234M462.235 437.234C490.216 396.762 525.26 359.494 574.106 325.648C594.806 308.891 636.82 278.066 700.626 264.815C731.55 258.393 774.266 255.216 811.581 258.03C813.444 258.03 817.488 259.387 818.765 264.815C819.732 268.924 823.187 321.999 811.581 378.332C804.022 415.024 778.897 469.387 753.709 501.659C714.77 551.55 694.872 576.978 638.364 615.268M549.361 661.706L535.733 696.174C535.174 697.586 534.895 698.293 534.968 699.018C535.041 699.743 535.455 700.38 536.284 701.653L577.198 764.506C579.879 768.625 581.22 770.685 583.007 770.535C584.794 770.385 585.772 768.131 587.73 763.623L626.533 674.27C626.661 673.975 626.725 673.827 626.773 673.674C626.821 673.521 626.852 673.363 626.915 673.047L638.364 615.268M549.361 661.706C571.069 653.82 565.991 652.278 583.286 643.745C601.7 634.661 623.863 625.094 638.364 615.268" stroke="white" strokeWidth="55" strokeLinejoin="round"/>
                            <path d="M632.48 358.264C668.085 333.89 692.348 348.108 703.819 358.264C713.761 370.728 735.259 403.134 711.399 433.048C687.54 462.961 653.132 449 636.767 438.998C621.932 421.764 596.874 382.638 632.48 358.264Z" stroke="white" strokeWidth="45"/>
                            <path d="M615.215 404.674C618.807 421.437 637.066 440.186 655.127 439.796C667.197 439.535 689.516 439.334 699.429 427.822C710.479 414.99 717.347 393.647 713.797 381.126C709.949 367.556 699.828 353.587 687.455 347.6" stroke="white" strokeWidth="39"/>
                            <path d="M260 682.412L376.143 587.071L496.278 698.025L354.754 823.747L370.295 733.212L291.083 765.905L311.638 691.465L260 682.412Z" fill="white" stroke="white" strokeWidth="10"/>
                            <path d="M353.102 663.835L403.994 621.1C404.346 620.804 404.855 620.787 405.227 621.059L430.692 639.659C430.779 639.722 430.854 639.798 430.916 639.885L452.282 669.798C452.566 670.195 452.521 670.739 452.176 671.085L406.302 717.068C405.672 717.699 404.594 717.253 404.594 716.361V684.306C404.594 683.606 403.895 683.123 403.241 683.37L369.079 696.277C368.212 696.605 367.404 695.679 367.846 694.865L382.925 667.077C383.287 666.411 382.804 665.6 382.046 665.6H353.745C352.811 665.6 352.387 664.435 353.102 663.835Z" fill="white" stroke="#2B7FFF" strokeWidth="10"/>
                          </svg>
                          39,443원
                        </p>
                        <button className="bg-blue-500 text-white px-4 py-3 rounded-[8px] font-medium text-sm flex items-center cursor-pointer mt-[-4]">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 mr-1.5">
                            <path d="M12 11.993a.75.75 0 0 0-.75.75v.006c0 .414.336.75.75.75h.006a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75H12ZM12 16.494a.75.75 0 0 0-.75.75v.005c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H12ZM8.999 17.244a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.006ZM7.499 16.494a.75.75 0 0 0-.75.75v.005c0 .414.336.75.75.75h.005a.75.75 0 0 0 .75-.75v-.005a.75.75 0 0 0-.75-.75H7.5ZM13.499 14.997a.75.75 0 0 1 .75-.75h.006a.75.75 0 0 1 .75.75v.005a.75.75 0 0 1-.75.75h-.006a.75.75 0 0 1-.75-.75v-.005ZM14.25 16.494a.75.75 0 0 0-.75.75v.006c0 .414.335.75.75.75h.005a.75.75 0 0 0 .75-.75v-.006a.75.75 0 0 0-.75-.75h-.005ZM15.75 14.995a.75.75 0 0 1 .75-.75h.005a.75.75 0 0 1 .75.75v.006a.75.75 0 0 1-.75.75H16.5a.75.75 0 0 1-.75-.75v-.006ZM13.498 12.743a.75.75 0 0 1 .75-.75h2.25a.75.75 0 1 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75ZM6.748 14.993a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z" />
                            <path fillRule="evenodd" d="M18 2.993a.75.75 0 0 0-1.5 0v1.5h-9V2.994a.75.75 0 1 0-1.5 0v1.497h-.752a3 3 0 0 0-3 3v11.252a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3V7.492a3 3 0 0 0-3-3H18V2.993ZM3.748 18.743v-7.5a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5h-13.5a1.5 1.5 0 0 1-1.5-1.5Z" clipRule="evenodd" />
                          </svg>
                          출석 체크
                        </button>
                      </div>
                    </div>
                  </div>
                </div>1
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}