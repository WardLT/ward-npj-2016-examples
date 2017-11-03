docker run -it --name ward_npj -p 8888:8888 --mount type=bind,source="%cd%",target=/home/jovyan/data --cpus="2" --memory=6g -e SPARK_OPTS="--driver-memory 12g" jupyter/all-spark-notebook