function GenerateUseRestoreScroll() {
  let data = null;

  return () => [
    data,
    (newData) => {
      data = newData;
    },
  ];
}

export default new GenerateUseRestoreScroll();
