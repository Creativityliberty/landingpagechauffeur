import { calculatePrice } from '../lib/pricing';

const runTest = (name: string, inputs: [number, number, number], expected: number) => {
    const [Dp, Dc, Dd] = inputs;
    const result = calculatePrice(Dp, Dc, Dd);

    const passed = Math.abs(result.total - expected) < 0.01;
    const status = passed ? "✅ PASS" : "❌ FAIL";

    console.log(`Test: ${name}`);
    console.log(`  Inputs: Dp=${Dp}, Dc=${Dc}, Dd=${Dd}`);
    console.log(`  Expected: ${expected}€`);
    console.log(`  Actual:   ${result.total}€`);
    console.log(`  Details:  Base=${result.base}, Approach=${result.approach}, Trip=${result.trip}, Return=${result.return}`);
    console.log(`  Status:   ${status}`);
    console.log('---');
};

console.log("Running Pricing Logic Tests...\n");

// Example 1: Client at center -> course 5 km
// 10 + 0 + (5*2) + 0 = 20€
runTest("Example 1: Short Trip in Center", [0, 5, 0], 20);

// Example 2: Client at 20 km -> course 5 km (outward, dropoff at 25km)
// 10 + (10*0.5) + (5*2) + (15*0.5) = 10 + 5 + 10 + 7.5 = 32.50€
runTest("Example 2: Outside Center Trip", [20, 5, 25], 32.50);

// Example 3: Client at center -> dropoff to Honfleur (~23 km)
// 10 + 0 + (23*2) + (13*0.5) = 10 + 46 + 6.50 = 62.50€
runTest("Example 3: Dropoff Outside Center", [0, 23, 23], 62.50);

// Additional Edge Cases
runTest("Edge Case: Exactly 10km pickup (No approach)", [10, 5, 10], 20);
runTest("Edge Case: exactly 10km dropoff (No return)", [0, 5, 10], 20);
runTest("Edge Case: Long Trip (>100km)", [0, 150, 0], 10 + 50 * 2 + 50 * 1.5 + 50 * 1 + 0); // 10 + 100 + 75 + 50 = 235
