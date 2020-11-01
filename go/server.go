package main

import (
	"bufio"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
)

type TwoNum struct {
	A int
	B int
}

type Result struct {
	Result string
}

func shaHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != "POST" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	var params TwoNum

	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	h := sha256.New()
	h.Write([]byte(strconv.Itoa(params.A + params.B)))
	hash := hex.EncodeToString(h.Sum(nil))

	ans := Result{hash}
	b, err := json.Marshal(ans)

	fmt.Fprintf(w, "%s", b)
}

func ReadLine(sc *bufio.Scanner, lineNum int) (line string, lastLine int, err error) {
	for sc.Scan() {
		lastLine++
		if lastLine == lineNum {
			return sc.Text(), lastLine, sc.Err()
		}
	}
	return line, lastLine, io.EOF
}

func writeHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != "GET" {
		http.Error(w, "Method is not supported.", http.StatusNotFound)
		return
	}

	line := r.URL.Query().Get("line")
	lineNumber, _ := strconv.Atoi(line)

	if line == "" || lineNumber <= 0 || lineNumber > 100 {
		http.Error(w, "Please write a valid number!", http.StatusNotFound)
		return
	}

	file, _ := os.Open("../file.txt")
	scanner := bufio.NewScanner(file)

	result, _, _ := ReadLine(scanner, lineNumber)
	fmt.Fprintf(w, "%s", result)
}

func main() {
	http.HandleFunc("/go/sha256", shaHandler)
	http.HandleFunc("/go/write", writeHandler)

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
