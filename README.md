# streamlit-timeslot-selector

Streamlit component that allows you to select timeslot as json data

## Installation instructions

```sh
pip install -e git+https://github.com/szeyu/streamlit-timeslot-selector.git@main#egg=streamlit-timeslot-selector
```

## Usage instructions

[Demo](https://github.com/szeyu/streamlit-timeslot-selector/main/resources/demo.png)

```python
import streamlit as st
from timeslot_selector import timeslot_selector

color = "red"
days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY']
start = "08:00"
end = "20:00"
interval = 30

json = timeslot_selector(color, days, start, end, interval)
st.write(json)
```
