function Completeness({ completeness }) {
  const palette = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(33, 150, 243)',
    'rgb(76, 175, 80)',
    'rgb(255, 87, 34)',
    'rgb(255, 193, 7)',
    'rgb(156, 39, 176)',
    'rgb(3, 169, 244)',
    'rgb(139, 195, 74)',
    'rgb(233, 30, 99)',
    'rgb(63, 81, 181)',
    'rgb(255, 152, 0)',
    'rgb(205, 220, 57)',
    'rgb(121, 85, 72)',
    'rgb(255, 111, 0)',
    'rgb(0, 188, 212)',
  ];

  const colorPicker = palette[Math.floor(Math.random() * palette.length)];

  return (
    <div className="completeness-cont">
      <div className="outside">
        <div
          className="inside"
          style={{ width: `${completeness}%`, backgroundColor: colorPicker }}
        ></div>
      </div>
      <div className="percent">{completeness}%</div>
    </div>
  );
}

export default Completeness;
