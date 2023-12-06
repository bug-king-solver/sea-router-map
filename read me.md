The goal of the challenge is to create an Angular single page application to visualise exported sea routes on the map.

The CSV file with the following columns:
* route_id - some arbitrary route id
* from_port - route origin
* to_port - route destination
* leg_duration - trip duration in milliseconds
* points - an array of vessel observations from GPS where observation is [longitude, latitude, timestamp in epoch milliseconds, actual vessel speed in knots]

Requirements:
1. Initially, no routes are shown on the map. The page should load with a global map.
2. There should be a route picker/filter component that allows to select a single route to be shown on the map.
3. Map should show the selected route.
4. There should be a graph/chart component that shows how the speed changes in time for the selected route

Bonus requirement would be to "color" the line on the map according to vessel speed, i.e. close to the port, it should be slow e.g. red and open sea where the vessel is faster should be green.

PS. Please publish the solution to your GitHub and invite us to review it

Any questions shoot and good luck!
