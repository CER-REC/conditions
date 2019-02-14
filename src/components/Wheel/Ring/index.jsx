import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Ring = ({ ringType }) => {
  const linebackground = `LineBackground ${ringType}`;
  const ringbackground = `RingBackground ${ringType}`;

  return (
    <g className="WheelRing" transform="translate(130 212)">
      <defs>
        <clipPath id="clip-path">
          <path className="RingUnion" d="M241.25,482.5a243.034,243.034,0,0,1-48.62-4.9,239.932,239.932,0,0,1-86.265-36.3A241.954,241.954,0,0,1,18.959,335.156,240.038,240.038,0,0,1,4.9,289.871a243.6,243.6,0,0,1,0-97.241,239.928,239.928,0,0,1,36.3-86.265A241.956,241.956,0,0,1,147.345,18.959,240.038,240.038,0,0,1,192.63,4.9a243.6,243.6,0,0,1,97.241,0,239.926,239.926,0,0,1,86.265,36.3,241.955,241.955,0,0,1,87.406,106.143A240.049,240.049,0,0,1,477.6,192.63a243.6,243.6,0,0,1,0,97.241,239.927,239.927,0,0,1-36.3,86.265,241.952,241.952,0,0,1-106.143,87.406A240.041,240.041,0,0,1,289.871,477.6,243.034,243.034,0,0,1,241.25,482.5Zm0-442.292a202.527,202.527,0,0,0-40.517,4.085,199.942,199.942,0,0,0-71.888,30.25A201.63,201.63,0,0,0,56.007,163a200.022,200.022,0,0,0-11.714,37.738,203,203,0,0,0,0,81.034,199.94,199.94,0,0,0,30.25,71.887A201.627,201.627,0,0,0,163,426.493a200.023,200.023,0,0,0,37.738,11.714,203,203,0,0,0,81.034,0,199.945,199.945,0,0,0,71.887-30.25A201.627,201.627,0,0,0,426.493,319.5a200.027,200.027,0,0,0,11.714-37.737,203,203,0,0,0,0-81.034,199.945,199.945,0,0,0-30.25-71.888A201.629,201.629,0,0,0,319.5,56.007a200.024,200.024,0,0,0-37.738-11.714A202.525,202.525,0,0,0,241.25,40.208Z" transform="translate(0 0)" />
        </clipPath>
      </defs>
      <g className="ClippedBackground">
        <g transform="translate(0.5 0.5)">
          <ellipse className={ringbackground} cx="240.251" cy="240.252" rx="240.251" ry="240.252" transform="translate(0.5 0.5)" />
          <g className={`Lines ${linebackground}`} transform="translate(0.5 0.502)">
            <line y1="481" transform="translate(481 240.498) rotate(90)" />
            <line y1="481" transform="matrix(-0.174, 0.985, -0.985, -0.174, 476.346, 282.26)" />
            <line y1="481" transform="translate(466.496 323.753) rotate(110)" />
            <line y1="481" transform="translate(447.779 360.748) rotate(120)" />
            <line y1="481" transform="translate(423.734 395.088) rotate(130)" />
            <line y1="481" transform="translate(394.09 424.731) rotate(140)" />
            <line y1="481" transform="translate(359.75 448.777) rotate(150)" />
            <line y1="481" transform="translate(321.756 466.494) rotate(160)" />
            <line y1="481" transform="matrix(-0.985, 0.174, -0.174, -0.985, 281.262, 477.344)" />
            <line y1="481" transform="matrix(-0.985, -0.174, 0.174, -0.985, 197.738, 477.344)" />
            <line y1="481" transform="translate(239.5 480.998) rotate(-180)" />
            <line y1="481" transform="translate(157.244 466.494) rotate(-160)" />
            <line y1="481" transform="translate(119.25 448.777) rotate(-150)" />
            <line y1="481" transform="translate(84.91 424.731) rotate(-140)" />
            <line y1="481" transform="translate(55.266 395.088) rotate(-130)" />
            <line y1="481" transform="translate(31.221 360.748) rotate(-120) " />
            <line y1="481" transform="translate(13.504 322.754) rotate(-110)" />
            <line y1="481" transform="matrix(-0.174, -0.985, 0.985, -0.174, 2.654, 282.26)" />
          </g>
        </g>
      </g>
      <g className="RingGroup" transform="translate(0 0)">
        <g className="OuterRing RingOutline">
          <path d="M 241.4999847412109 1.999969482421875 C 225.2489318847656 1.999969482421875 209.0086059570312 3.637115478515625 193.2302856445312 6.86578369140625 C 177.8539123535156 10.01223754882812 162.729248046875 14.70724487304688 148.2764282226562 20.82022094726562 C 134.0854797363281 26.82254028320312 120.3981628417969 34.25180053710938 107.5946655273438 42.90167236328125 C 94.91229248046875 51.46966552734375 82.98629760742188 61.30953979492188 72.14791870117188 72.14791870117188 C 61.30953979492188 82.98629760742188 51.46966552734375 94.91229248046875 42.90167236328125 107.5946655273438 C 34.25180053710938 120.3981628417969 26.82254028320312 134.0854797363281 20.82022094726562 148.2764282226562 C 14.70724487304688 162.729248046875 10.01223754882812 177.8539123535156 6.86578369140625 193.2302856445312 C 3.637115478515625 209.0086059570312 1.999969482421875 225.2489318847656 1.999969482421875 241.4999847412109 C 1.999969482421875 257.7510375976562 3.637115478515625 273.9913635253906 6.86578369140625 289.7696533203125 C 10.01223754882812 305.1460571289062 14.70724487304688 320.270751953125 20.82022094726562 334.7235412597656 C 26.82254028320312 348.9144897460938 34.25180053710938 362.601806640625 42.90167236328125 375.4053039550781 C 51.46966552734375 388.0876770019531 61.30953979492188 400.013671875 72.14791870117188 410.85205078125 C 82.98629760742188 421.6904296875 94.91229248046875 431.5303039550781 107.5946655273438 440.0982971191406 C 120.3981628417969 448.7481689453125 134.0854797363281 456.1774291992188 148.2764282226562 462.1797485351562 C 162.729248046875 468.292724609375 177.8539123535156 472.9877319335938 193.2302856445312 476.1341857910156 C 209.0086059570312 479.3628540039062 225.2489318847656 481 241.4999847412109 481 C 257.7510375976562 481 273.9913635253906 479.3628540039062 289.7696533203125 476.1341857910156 C 305.1460571289062 472.9877319335938 320.270751953125 468.292724609375 334.7235412597656 462.1797485351562 C 348.9144897460938 456.1774291992188 362.601806640625 448.7481689453125 375.4053039550781 440.0982971191406 C 388.0876770019531 431.5303039550781 400.013671875 421.6904296875 410.85205078125 410.85205078125 C 421.6904296875 400.013671875 431.5303039550781 388.0876770019531 440.0982971191406 375.4053039550781 C 448.7481689453125 362.601806640625 456.1774291992188 348.9144897460938 462.1797485351562 334.7235412597656 C 468.292724609375 320.270751953125 472.9877319335938 305.1460571289062 476.1341857910156 289.7696533203125 C 479.3628540039062 273.9913635253906 481 257.7510375976562 481 241.4999847412109 C 481 225.2489318847656 479.3628540039062 209.0086059570312 476.1341857910156 193.2302856445312 C 472.9877319335938 177.8539123535156 468.292724609375 162.729248046875 462.1797485351562 148.2764282226562 C 456.1774291992188 134.0854797363281 448.7481689453125 120.3981628417969 440.0982971191406 107.5946655273438 C 431.5303039550781 94.91229248046875 421.6904296875 82.98629760742188 410.85205078125 72.14791870117188 C 400.013671875 61.30953979492188 388.0876770019531 51.46966552734375 375.4053039550781 42.90167236328125 C 362.601806640625 34.25180053710938 348.9144897460938 26.82254028320312 334.7235412597656 20.82022094726562 C 320.270751953125 14.70724487304688 305.1460571289062 10.01223754882812 289.7696533203125 6.86578369140625 C 273.9913635253906 3.637115478515625 257.7510375976562 1.999969482421875 241.4999847412109 1.999969482421875 M 241.4999847412109 -3.0517578125e-05 C 374.8767395019531 -3.0517578125e-05 483 108.1232299804688 483 241.4999847412109 C 483 374.8767395019531 374.8767395019531 483 241.4999847412109 483 C 108.1232299804688 483 -3.0517578125e-05 374.8767395019531 -3.0517578125e-05 241.4999847412109 C -3.0517578125e-05 108.1232299804688 108.1232299804688 -3.0517578125e-05 241.4999847412109 -3.0517578125e-05 Z" />
        </g>
        <g className="InnerRing RingOutline" transform="translate(39.5 39.5)">
          <path d="M 201.9999847412109 1.999969482421875 C 188.4289245605469 1.999969482421875 174.8669891357422 3.367095947265625 161.6908721923828 6.06329345703125 C 148.8506622314453 8.690765380859375 136.2206115722656 12.61135864257812 124.1515502929688 17.71615600585938 C 112.3012084960938 22.72845458984375 100.8713073730469 28.93240356445312 90.179443359375 36.15567016601562 C 79.58871459960938 43.3106689453125 69.6295166015625 51.5277099609375 60.57861328125 60.57861328125 C 51.5277099609375 69.6295166015625 43.3106689453125 79.58871459960938 36.15567016601562 90.179443359375 C 28.93240356445312 100.8713073730469 22.72845458984375 112.3012084960938 17.71615600585938 124.1515502929688 C 12.61135864257812 136.2206115722656 8.690765380859375 148.8506622314453 6.06329345703125 161.6908721923828 C 3.367095947265625 174.8669891357422 1.999969482421875 188.4289245605469 1.999969482421875 201.9999847412109 C 1.999969482421875 215.571044921875 3.367095947265625 229.1329803466797 6.06329345703125 242.3090972900391 C 8.690765380859375 255.1493072509766 12.61135864257812 267.7793579101562 17.71615600585938 279.848388671875 C 22.72845458984375 291.6987915039062 28.93240356445312 303.128662109375 36.15567016601562 313.8204956054688 C 43.3106689453125 324.4112548828125 51.5277099609375 334.3704528808594 60.57861328125 343.4213562011719 C 69.6295166015625 352.4722595214844 79.58871459960938 360.6893005371094 90.179443359375 367.8442993164062 C 100.8713073730469 375.0675659179688 112.3012084960938 381.2715148925781 124.1515502929688 386.2838134765625 C 136.2206115722656 391.3886108398438 148.8506622314453 395.3092041015625 161.6908721923828 397.9366760253906 C 174.8669891357422 400.6328735351562 188.4289245605469 402 201.9999847412109 402 C 215.571044921875 402 229.1329803466797 400.6328735351562 242.3090972900391 397.9366760253906 C 255.1493072509766 395.3092041015625 267.7793579101562 391.3886108398438 279.848388671875 386.2838134765625 C 291.6987915039062 381.2715148925781 303.128662109375 375.0675659179688 313.8204956054688 367.8442993164062 C 324.4112548828125 360.6893005371094 334.3704528808594 352.4722595214844 343.4213562011719 343.4213562011719 C 352.4722595214844 334.3704528808594 360.6893005371094 324.4112548828125 367.8442993164062 313.8204956054688 C 375.0675659179688 303.128662109375 381.2715148925781 291.6987915039062 386.2838134765625 279.848388671875 C 391.3886108398438 267.7793579101562 395.3092041015625 255.1493072509766 397.9366760253906 242.3090972900391 C 400.6328735351562 229.1329803466797 402 215.571044921875 402 201.9999847412109 C 402 188.4289245605469 400.6328735351562 174.8669891357422 397.9366760253906 161.6908721923828 C 395.3092041015625 148.8506622314453 391.3886108398438 136.2206115722656 386.2838134765625 124.1515502929688 C 381.2715148925781 112.3012084960938 375.0675659179688 100.8713073730469 367.8442993164062 90.179443359375 C 360.6893005371094 79.58871459960938 352.4722595214844 69.6295166015625 343.4213562011719 60.57861328125 C 334.3704528808594 51.5277099609375 324.4112548828125 43.3106689453125 313.8204956054688 36.15567016601562 C 303.128662109375 28.93240356445312 291.6987915039062 22.72845458984375 279.848388671875 17.71615600585938 C 267.7793579101562 12.61135864257812 255.1493072509766 8.690765380859375 242.3090972900391 6.06329345703125 C 229.1329803466797 3.367095947265625 215.571044921875 1.999969482421875 201.9999847412109 1.999969482421875 M 201.9999847412109 -3.0517578125e-05 C 313.5615234375 -3.0517578125e-05 404 90.43844604492188 404 201.9999847412109 C 404 313.5615234375 313.5615234375 404 201.9999847412109 404 C 90.43844604492188 404 -3.0517578125e-05 313.5615234375 -3.0517578125e-05 201.9999847412109 C -3.0517578125e-05 90.43844604492188 90.43844604492188 -3.0517578125e-05 201.9999847412109 -3.0517578125e-05 Z" />
        </g>
      </g>
    </g>

  );
};

Ring.propTypes = {
  ringType: PropTypes.oneOf(['Company', 'Location']),
};

Ring.defaultProps = {
  ringType: 'Company',
};

export default Ring;
