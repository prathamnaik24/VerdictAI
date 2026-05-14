# Step 10 Testing Guide - Quick & Practical

## Start the Dev Server

```bash
npm run dev
```

Should see:
```
✓ Ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

---

## Test Flow 1: Happy Path (Complete Assessment)

### Step 1: Go to Intake Form
```
http://localhost:3000/intake
```

### Step 2: Fill Form with Good Case Data

**Dispute Type:** Security Deposit Dispute  
**Title:** Landlord Refusing to Return Deposit

**Description:** (Copy this exactly)
```
I rented an apartment for 2 years. Paid 30,000 rupees security deposit.
Lease ended June 2024. Moved out completely. Left property in excellent 
condition. Landlord refusing to return deposit without reason. Sent legal 
notice in August 2024. No response. Have:
- Copy of lease agreement
- Photos of property condition at move-out
- Email correspondence with landlord
- Bank statement showing deposit payment
- Proof of legal notice delivery
```

**Location:** Mumbai  
**Date of Incident:** 2024-06-30

### Step 3: Click "Analyze My Case"

**Watch for:**
- ✅ "Processing Your Case" screen appears
- ✅ Spinner animation
- ✅ 3 bouncing dots below
- ⏱️ Wait 2-3 seconds

### Step 4: Dashboard Loads - Verify All Sections

**TOP ROW (3 Columns):**
```
┌─────────────────────┬─────────────────────┬─────────────────────┐
│ Legal Assessment    │ Assessment Conf.    │ Litigation Ready    │
│ LIKELY FAVORABLE    │ HIGH CONFIDENCE     │ MOSTLY READY        │
│ 75/100              │ 80%                 │ 72/100              │
└─────────────────────┴─────────────────────┴─────────────────────┘
```

**Check:**
- ✅ Outcome card shows GREEN color (favorable)
- ✅ Shows "Likely Favorable" label + 75/100 score
- ✅ Confidence shows "High Confidence" + % bar
- ✅ Readiness shows "Mostly Ready" + score

**MIDDLE ROW (2 Columns):**
```
┌─────────────────────────────┬─────────────────────────────┐
│ Favorable Factors           │ Risk Factors                │
│ ✓ Lease agreement available │ ⚠ Landlord may claim       │
│ ✓ Email proof of payment    │ ⚠ Deposit amount dispute   │
│ ✓ Move-out photos           │                             │
└─────────────────────────────┴─────────────────────────────┘
```

**Check:**
- ✅ Favorable factors show with green checkmarks
- ✅ Risk factors show with orange/red warnings
- ✅ Text is readable and makes sense

**FULL WIDTH SECTIONS:**
```
□ Missing Evidence section (show any gaps)
□ Practical Litigation Risk section (HIGH RISK card)
□ Relevant Precedents (top 3 cases)
□ Recommended Next Steps (numbered list)
```

**Check:**
- ✅ Missing evidence lists what's needed
- ✅ Practical risk shows score + critical challenges
- ✅ Precedents show case names + similarity %
- ✅ All text renders clearly

---

## Test Flow 2: Weak Case (See Low Scores)

### Go Back to Intake
```
Click "Back to Intake" button at bottom
```

### Fill New Form with Weak Case

**Dispute Type:** Consumer Fraud  
**Title:** Defective Product Complaint

**Description:**
```
Bought phone from local shop. Stopped working after 1 month.
Shop owner says no warranty. No receipt. Tried returning but 
shop closed down. No documentation.
```

**Location:** Delhi  
**Date:** 2024-05-15

### Click "Analyze My Case"

**Expected Results:**
- ✅ Dashboard loads
- ✅ Score LOWER (maybe 35-40/100)
- ✅ Color is ORANGE/RED (unfavorable)
- ✅ Confidence is LOWER ("Moderate" or "Low")
- ✅ Readiness is LOWER (maybe 25-35/100)
- ✅ Many risk factors shown
- ✅ Lots of missing evidence listed
- ✅ Practical risk is HIGH
- ✅ Message says "gather evidence first"

---

## Test Flow 3: Check Loading State

### Fill a Case Form
Don't click submit yet.

### Open DevTools (F12)
```
Network tab → Throttle dropdown → "Slow 3G"
```

### Submit Form
```
Click "Analyze My Case"
```

**Expected:**
- ✅ Loading screen appears IMMEDIATELY
- ✅ Spinner rotates smoothly
- ✅ Three dots bounce animation
- ✅ "Processing Your Case" message visible
- ✅ Takes ~10 seconds (due to throttle)
- ✅ Then dashboard appears

### Remove Throttling
```
Throttle dropdown → "No throttle"
```

---

## Test Flow 4: Check Error Handling

### Intentionally Break Something

**Option A: Clear Browser Storage (Clean Start)**
```
F12 → Application tab → Storage → Clear Site Data
```

### Go to Intake
```
http://localhost:3000/intake
```

### Try to Submit Empty Form
```
Click "Analyze My Case" with empty fields
```

**Expected:**
- ✅ Form shows validation error: "Please fill in all required fields"
- ✅ Page doesn't navigate
- ✅ Alert appears

### Fill Form, Then Clear Cache During Submission
```
1. Fill form completely
2. Click "Analyze My Case"
3. Immediately F12 → Network tab → Offline
4. Watch what happens
```

**Expected:**
- ✅ Loading screen appears
- ✅ After 3-5 seconds, ERROR state appears
- ✅ Shows error message
- ✅ "Try Again" button visible
- ✅ "Go Back" button visible
- ✅ Click "Try Again" → tries assessment again

---

## Test Flow 5: Verify Component Rendering

### Submit a Case
Use Test Flow 1 data.

### In Browser DevTools (F12)

**Check Console:**
```
Open F12 → Console tab
Look for:
✅ No red errors
✅ No orange warnings
✅ Relevant log messages
```

**Check Elements:**
```
F12 → Elements tab
Search for component names:
- OutcomeCard (should show)
- ConfidenceMeter (should show)
- ReadinessScore (should show)
- MissingEvidenceCard (should show)
- PracticalRiskCard (should show)
- PrecedentList (should show)
```

---

## Test Flow 6: Check Colors & Styling

### Dashboard Page
```
Look for:
✅ Favorable outcome = GREEN
✅ Unfavorable = ORANGE/RED
✅ Neutral = BLUE
✅ High confidence = GREEN meter
✅ Low confidence = ORANGE meter
✅ Risk factors = RED background
✅ Favorable factors = GREEN background
```

---

## Test Flow 7: Responsive Design

### Desktop View (Full Width)
```
1. Dashboard should show 3 columns at top
2. Should show 2 columns in middle
3. Full width sections below
4. All readable
```

### Tablet View (768px)
```
F12 → Responsive Design Mode
Set to: iPad (768px)

Expected:
✅ 2 columns at top
✅ 1 column sections
✅ All readable
✅ No overflow
```

### Mobile View (375px)
```
F12 → Responsive Design Mode
Set to: iPhone SE (375px)

Expected:
✅ 1 column only
✅ All text readable
✅ No horizontal scroll
✅ Buttons full width
```

---

## Test Flow 8: Check Precedents Display

### Submit a Case
```
Use Test Flow 1 data
```

### Scroll to Precedents Section
```
Look for "Relevant Precedents"
```

### Expected:
```
Shows either:
A) Top 3 precedents with:
   ✅ Case name
   ✅ Court & year
   ✅ Similarity % badge
   ✅ Brief summary
   
OR

B) Empty state message:
   "No similar precedents found in database"
   "More precedents will be added as cases accumulate"
```

---

## Test Flow 9: Navigate Between Pages

### From Dashboard
```
Click "Back to Intake"
✅ Goes to intake page
✅ Form is reset/empty
```

### From Dashboard
```
Click "Start Simulator"
✅ Goes to simulator page
(Note: simulator may not be fully implemented yet)
```

### From Intake
```
Click "Back to Home"
✅ Goes to home page
```

---

## Test Flow 10: Check Console for Errors

### Any Page
```
F12 → Console tab
```

**Good Result:**
```
No red errors
Maybe some info logs
Maybe some warnings (but not many)
```

**Bad Result:**
```
Red errors like:
- Cannot read properties of undefined
- Module not found
- Import errors
```

**If Bad Result:**
```
1. Restart server: Ctrl+C, then npm run dev
2. Hard refresh: Ctrl+Shift+R
3. Check file names match imports
```

---

## Quick Checklist for Manual Testing

### Intake Page
- [ ] All form fields visible
- [ ] Dispute type dropdown works
- [ ] Can type in text fields
- [ ] Can pick date
- [ ] Submit button works
- [ ] Validation works (try submitting empty)

### Dashboard Page
- [ ] Loads within 3 seconds
- [ ] All 6 main sections visible
- [ ] Colors make sense
- [ ] All text readable
- [ ] No layout broken
- [ ] Navigation buttons work
- [ ] Responsive on mobile

### Loading State
- [ ] Appears on submit
- [ ] Spinner animates
- [ ] Message makes sense
- [ ] Disappears after load

### Error State
- [ ] Shows if API fails
- [ ] Retry button works
- [ ] Go back button works
- [ ] Message is helpful

### Data Display
- [ ] Assessment scores show
- [ ] Labels before numbers
- [ ] Colors match meaning
- [ ] All text is professional
- [ ] No raw JSON showing
- [ ] No errors in console

---

## Common Issues & Fixes

### Issue: Nothing loads, blank page
**Fix:**
```bash
Ctrl+C (stop server)
npm run dev (restart)
Hard refresh: Ctrl+Shift+R
```

### Issue: Form submit does nothing
**Fix:**
```
Check console (F12) for errors
Make sure all required fields filled
Try different data
```

### Issue: Dashboard shows errors
**Fix:**
```
Check API endpoints running
Look at server logs (where you ran npm run dev)
Check Network tab in DevTools for 404s
```

### Issue: Styling looks broken
**Fix:**
```bash
npm run dev (restart to rebuild CSS)
Clear browser cache: F12 → Application → Clear Site Data
Hard refresh: Ctrl+Shift+R
```

### Issue: Colors not showing
**Fix:**
```
This is Tailwind CSS issue
Restart: Ctrl+C, npm run dev
Wait for "Ready" message
Hard refresh browser
```

---

## Success Indicators

✅ Form fills out and submits  
✅ Dashboard loads in ~2-3 seconds  
✅ All 10 components render  
✅ Colors match the legal direction  
✅ Numbers and labels make sense  
✅ Can go back to intake  
✅ Can submit different cases  
✅ Error handling works  
✅ No console errors  
✅ Mobile view works  

---

## That's It!

Test in this order:
1. Happy path (good case)
2. Weak case (bad case)
3. Loading animation
4. Error handling
5. Mobile view
6. Console check

Then you're done. Everything is working correctly.
