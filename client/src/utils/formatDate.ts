export const formatDate = (date: string | number) => {
  try {
    // Check if the input is a timestamp (number)
    const transactionDate =
      typeof date === "number" || !isNaN(Number(date))
        ? new Date(Number(date))
        : new Date(date);

    if (isNaN(transactionDate.getTime())) {
      throw new Error("Invalid date");
    }

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(transactionDate);

    return formattedDate;
  } catch (error) {
    console.error((error as Error).message);
    return "Invalid Date";
  }
};
