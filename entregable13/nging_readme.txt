How to start the servers



start PM2 servers:

-> Initiate server on Port 8080 on P2M: 
pm2 start server.js --name="8080" --watch -- --p 8080

Random:
-> Initiate server on Port 8082 with Fork mode on code and Cluster mode on P2M: 
pm2 start server.js --name="8082" --watch -i max -- --p 8082

-> Initiate server on Port 8081 with Cluster mode on code and Fork mode on P2M:
pm2 start server.js --name="8081" --watch -- --p 8081 --m CLUSTER 

config nginx:

-> all e_commerce routes will be redirected to port 8080
-> api random route will be redirected to 8081 and 8082 with balancer 10/1 on 8081
-> run nginx with
sudo nginx
