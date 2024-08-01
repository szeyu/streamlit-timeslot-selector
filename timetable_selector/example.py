import streamlit as st
from timetable_selector import timetable_selector

# Add some test code to play with the component while it's in development.
# During development, we can run this just as we would any other Streamlit
# app: `$ streamlit run timetable_selector/example.py`

json = timetable_selector()
st.write(json)

