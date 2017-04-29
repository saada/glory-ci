package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestHandler(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "http://localhost:8000/", nil)
	if err != nil {
		t.Fatalf("Could not handle request: %v", err)
	}

	rec := httptest.NewRecorder()
	handler(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("Expected status 200, got %d", rec.Code)
	}

	if !strings.Contains(rec.Body.String(), "Hey") {
		t.Errorf("Unexpected body in response: %q", rec.Body.String())
	}
}
