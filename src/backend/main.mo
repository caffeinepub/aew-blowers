import Map "mo:core/Map";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

actor {
  type Inquiry = {
    name : Text;
    email : Text;
    phone : Text;
    company : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Inquiry {
    public func compareByTimestamp(a : Inquiry, b : Inquiry) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  let inquiries = Map.empty<Text, Inquiry>();

  let admin = Principal.fromText("2vxsx-fae");

  public shared ({ caller }) func submitInquiry(
    name : Text,
    email : Text,
    phone : Text,
    company : Text,
    message : Text,
  ) : async () {
    let timestamp = Time.now();
    let inquiry : Inquiry = {
      name;
      email;
      phone;
      company;
      message;
      timestamp;
    };

    let id = timestamp.toText();
    inquiries.add(id, inquiry);
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (caller != admin) { Runtime.trap("Only admin can view inquiries") };
    inquiries.values().toArray().sort(Inquiry.compareByTimestamp);
  };
};
