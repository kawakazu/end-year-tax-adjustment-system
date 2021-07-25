FROM ubuntu

RUN apt update -y
RUN apt install python3 -y -qq --no-install-recommends
RUN apt install python3-pip -y -qq --no-install-recommends
RUN pip3 install --upgrade pip

COPY requirements.txt /usr/src/app/
RUN pip install --no-cache-dir -r /usr/src/app/requirements.txt

COPY app.py /usr/src/app/
# COPY templates

EXPOSE 5000

CMD ["python3", "/usr/src/app/app.py"]