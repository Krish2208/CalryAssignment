import * as readline from 'readline';

function optimizeBookings(bookings: number[][]): number[][] {
    if (bookings.length === 0) {
        return [];
    }

    bookings.sort((a, b) => a[0] - b[0]);   // Sort the bookings according to the start time
    const mergedBookings: number[][] = [];
    let currentBooking = bookings[0];   // Initialize the first booking

    for (let i = 1; i < bookings.length; i++) {
        const nextBooking = bookings[i];
        if (currentBooking[1] >= nextBooking[0]) {  // Check for overlap
            currentBooking[1] = Math.max(currentBooking[1], nextBooking[1]);    // Merge the intervals by updating the end time
        } else {    // No overlap, push the current booking and update to the next one
            mergedBookings.push(currentBooking);
            currentBooking = nextBooking;
        }
    }
    mergedBookings.push(currentBooking);    // Push the last interval
    return mergedBookings;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt the user for input
function promptForBookings(): void {
    rl.question('Enter the list of bookings as [[start, end], [start, end], ...]: ', (input) => {
        try {
            const bookings: number[][] = JSON.parse(input); // Parse the input string into an array of arrays
            // Validate input to ensure it is a valid array of arrays
            if (!Array.isArray(bookings) || !bookings.every(arr => Array.isArray(arr) && arr.length === 2 && arr.every(num => typeof num === 'number'))) {
                console.error('Invalid input format. Please enter bookings as an array of [start, end] pairs.');
            } else {
                const result = optimizeBookings(bookings);  // Call the optimizeBookings function and log the result
                console.log('Optimized Bookings:', result);
            }
        } catch (error) {
            console.error('Error parsing input. Make sure the input is a valid array of numbers.');
        }

        rl.close(); // Close the readline interface
    });
}

promptForBookings();