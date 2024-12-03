// Todays problem was solved using c++, with g++ v13.2.0
//
// An `input.txt` file is required in the same folder the solution is runned

#include <iostream>
#include <fstream>
#include <vector>
#include <string>

enum Order {
  ASCENDING,
  DESCENDING,
  UNKNOWN
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
    bool isFirst = true, report_valid = true;
    enum Order order = UNKNOWN;

    for(auto it = line.begin(); it != line.end() && report_valid; it++) {
      char c = *it;
      if(c != ' ') {
        curr = curr * 10 + (c - '0');
      } else {
        if(!isFirst) {
          if(order == UNKNOWN) order = prev < curr ? ASCENDING : DESCENDING;
          report_valid = isValid(prev, curr, order);
        }
        isFirst = false;
        prev = curr;
        curr = 0;
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
