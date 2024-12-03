// Todays problem was solved using c++, with g++ v13.2.0
//
// An `input.txt` file is required in the same folder the solution is runned

#include <iostream>
#include <fstream>
#include <vector>
#include <string>

enum State {
  FIRST, 
  SECOND,
  REST
};

enum Order {
  ASCENDING,
  DESCENDING
};

bool isValid(int prev, int curr, enum Order order) {
  if(prev == curr) return false;

  if(order == ASCENDING) {
    if(prev > curr) return false;
    else if(curr - prev > 3) return false;
  } else {
    if(prev < curr) return false;
    else if(prev - curr > 3) return false;
  }

  return true;
}

int main() {
  std::ifstream input_file("input.txt");
  int safe = 0;

  std::string line;
  while(getline(input_file, line)) {
    int prev = 0, curr = 0;
    enum State state = FIRST;
    enum Order order;
    bool report_valid = true;
    
    for(char &c : line) {
      if(c != ' ') {
        curr = curr * 10 + (c - '0');
      } else {
        if(state == FIRST){
          state = SECOND;
        } else if(state == SECOND) {
          if(prev < curr) {
            order = ASCENDING;
          } else if(prev > curr){
            order = DESCENDING;
          }
          state = REST;
          report_valid = isValid(prev, curr, order);
        } else {
          report_valid = isValid(prev, curr, order);
        }
        prev = curr;
        curr = 0;
      }


      if(!report_valid) {
        break;
      }
    }
    if(report_valid) report_valid = isValid(prev, curr, order);

    if(report_valid) {
      safe++;
    }
  }
  input_file.close();

  std::cout << "Safe reports: " << safe << std::endl;
}
