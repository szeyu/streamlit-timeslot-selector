import { Streamlit, RenderData } from "streamlit-component-lib";

// Function to generate time slots
function generateTimeSlots(startTime: string, endTime: string, interval: number): string[] {
    const slots: string[] = [];
    let start = parseTime(startTime);
    const end = parseTime(endTime);

    while (start < end) {
        const endSlot = new Date(start.getTime() + interval * 60000);
        slots.push(`${formatTime(start)} - ${formatTime(endSlot)}`);
        start = endSlot;
    }

    return slots;
}

// Function to parse a time string
function parseTime(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

// Function to format a Date object to a time string
function formatTime(date: Date): string {
    return date.toTimeString().slice(0, 5);
}

// Function to handle the component's rendering
function onRender(event: Event): void {
    Streamlit.setFrameHeight();
    const data = (event as CustomEvent<RenderData>).detail;
    const color: string = data.args.color;
    const days: string[] = data.args.days;
    const start: string = data.args.start;
    const end: string = data.args.end;
    const interval: number = data.args.interval;

    const timeSlots = generateTimeSlots(start, end, interval);
    const table = document.getElementById('time-slots-table') as HTMLTableElement;
    const theadRow = table.querySelector('thead tr') as HTMLTableRowElement;
    const tbody = table.querySelector('tbody') as HTMLTableSectionElement;

    // Clear existing rows in thead and tbody
    theadRow.innerHTML = '';
    tbody.innerHTML = '';

    // Create header row with time slots
    const emptyHeader = document.createElement('th');
    theadRow.appendChild(emptyHeader);  // Add an empty header for the days column

    timeSlots.forEach(slot => {
        const th = document.createElement('th');
        th.textContent = slot;
        theadRow.appendChild(th);
    });

    // Create rows for each day
    days.forEach(day => {
        const tr = document.createElement('tr');
        const dayCell = document.createElement('td');
        dayCell.textContent = day;
        tr.appendChild(dayCell);

        timeSlots.forEach(slot => {
            const td = document.createElement('td');
            td.classList.add('time-slot');
            td.dataset.day = day;
            td.dataset.time = slot;
            td.addEventListener('click', () => {
                const isSelected = td.classList.toggle('selected');
                if (isSelected) {
                    td.style.backgroundColor = color;
                } else {
                    td.style.backgroundColor = ''; // Reset to default
                }

                const selectedSlots = document.querySelectorAll('.time-slot.selected');
                const selectedTimes = Array.from(selectedSlots).map(slot => ({
                    day: (slot as HTMLElement).dataset.day,
                    time: (slot as HTMLElement).dataset.time
                }));
                const selectedTimesJson = JSON.stringify(selectedTimes, null, 2);
                Streamlit.setComponentValue(selectedTimesJson);
            });
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
}


// Attach our `onRender` handler to Streamlit's render event
Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender);

// Tell Streamlit we're ready to start receiving data
Streamlit.setComponentReady();

// Tell Streamlit to update our initial height
Streamlit.setFrameHeight();
