let generatedNumbers = new Set();
export default function uniqueRandomGenerator() {
    if (generatedNumbers.size >= 150) {
        generatedNumbers.clear(); // Reset after all numbers are used
    }

    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 150) + 1;
    } while (generatedNumbers.has(randomNumber));

    generatedNumbers.add(randomNumber);
    // console.log("randtab", Array.from(generatedNumbers)[generatedNumbers.size - 1]);

    return generatedNumbers;
}


