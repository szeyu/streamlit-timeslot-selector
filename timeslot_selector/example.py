import streamlit as st
from timeslot_selector import timeslot_selector

# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run timeslot_selector/example.py`
color = "red"
days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
start = "08:00"
end = "20:00"
interval = 30

json = timeslot_selector(color, days, start, end, interval)
st.write(json)

